package controllers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;

import javax.inject.Inject;
import javax.inject.Provider;

import models.Model;
import models.Template;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.bson.conversions.Bson;

import play.Application;
import play.Logger;
import play.libs.Json;
import play.libs.ws.WSClient;
import play.libs.ws.WSRequest;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Http.Cookie;
import play.mvc.Result;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class EnvisionController extends Controller {

	private static final String ENVISION_PLATFORM_URL = "https://businessmakeover.evolaris.net/";
	//private static final String ENVISION_PLATFORM_URL = "http://evodeployment.evolaris.net:8080/";
	
	@Inject
	private Provider<Application> application;
	
	@SuppressWarnings("unused")
	private static final String APP_ID = "1193159677397239";
	@SuppressWarnings("unused")
	private static final String APP_SECRET = "6a5e79d7cabb0b0198f5ce94469b4e8a";

	private static final int MAX_MODEL_LENGTH = 50000;
	private static final int MAX_STORED_MODELS = 100;
	
	
    private ObjectMapper mapper = new ObjectMapper();

    @Inject 
    private WSClient ws;
    
	private MongoClient mongoClient = new MongoClient("localhost");
	 
	/**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    //public Result index() {
	public Result index(String userId, String secret) {
		// to use for debug purposes
//		if (userId == null && secret == null) {
//			userId = "691f9cd6dd826701x6a797679x15869400418x-371f";
//			secret = "728b0c53-9554-493a-b414-0f8e9787e713";
//		}
		
    	return indexResponse(userId, secret);
    }
    
    public Result postIndex() {
    	Map<String, String[]> formData = request().body().asFormUrlEncoded();
    	String userId = singleArrayElement(formData.get("userId"));
    	String secret = singleArrayElement(formData.get("secret"));

    	return indexResponse(userId, secret);
    }
    
    private Result indexResponse(String userId, String secret) {
    	if (!StringUtils.isBlank(userId) && !StringUtils.isBlank(secret)) {
        	Logger.info("Checking access for user " + userId);
    		validateEvolarisUser(userId, secret);
    		response().setCookie(new Cookie("userId", userId, null, null, null, false, false));
    		response().setCookie(new Cookie("secret", secret, null, null, null, false, false));
    	}
    	else {
    		response().discardCookie("userId");
    		response().discardCookie("secret");
    	}
    	
        return ok(application.get().resourceAsStream("public/index.html"));
    }
    
    private static String singleArrayElement(String[] arr) {
    	if (arr == null) {
    		return null;
    	}
    	else if (arr.length != 1) {
    		return null;
    	}
    	else {
    		return arr[0];
    	}
    }
    
    public Result demo(String accessToken) {
    	FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
    	User user = fbClient.fetchObject("me", User.class, Parameter.with("fields", "email,first_name,last_name,gender"));
    	
        System.out.println(user.getFirstName() + " " + user.getLastName() + ", " + user.getEmail() + ", " + user.getId());
        return ok();
    }

    public Result getModels(String userId, String secret, String kind) {
    	//String userId = loadFacebookUserId(accessToken);
    	validateEvolarisUser(userId, secret);
    	
    	Map<String, Model> models = loadModels(userId, kind);
    	ArrayNode arr = mapper.createArrayNode();
    	models.forEach((key, value) -> arr.add(createModelJson(value)));
    	return ok(arr);
    }
    
    private ObjectNode createModelJson(Model model) {
		ObjectNode child = mapper.createObjectNode();
		child.put("id", model.id);
		child.put("title", model.name);
		child.put("date", model.date);
		child.put("kind", model.kind);
    	return child;
    }
    
    public Result getModel(String modelId, String userId, String secret) {
    	//String userId = loadFacebookUserId(accessToken);
    	validateEvolarisUser(userId, secret);

    	String json = loadModel(userId, modelId);
    	if (json == null) {
    		Logger.info("Model " + modelId + " for user " + userId + " not found");
    		return notFound("Model " + modelId + " for user " + userId + " not found");
    	}
    	
    	Logger.info("Model " + modelId + " for user " + userId + " found, " + json.length() + " chars");
    	return ok(Json.parse(json));
    }
    
    public Result postModel(String userId, String secret) {
    	//String userId = loadFacebookUserId(accessToken);
    	validateEvolarisUser(userId, secret);

    	String modelId = UUID.randomUUID().toString();
    	JsonNode jsonBody = request().body().asJson();
    	String json;
		try {
			json = mapper.writeValueAsString(jsonBody);
		} catch (JsonProcessingException e) {
			return badRequest();
		}

    	saveModel(json, userId, modelId);
    	response().setHeader(LOCATION, "/api/models/" + modelId);
		return created();
    }
    
    public Result putModel(String modelId, String userId, String secret) {
    	//String userId = loadFacebookUserId(accessToken);
    	validateEvolarisUser(userId, secret);

    	JsonNode jsonBody = request().body().asJson();
    	String json;
		try {
			json = mapper.writeValueAsString(jsonBody);
		} catch (JsonProcessingException e) {
			return badRequest();
		}
    	saveModel(json, userId, modelId);
//    	Logger.info("PUT model " + modelId + " successfull");
    	return ok();
    }
    
    public Result deleteModel(String modelId, String userId, String secret) {
    	//String userId = loadFacebookUserId(accessToken);
    	validateEvolarisUser(userId, secret);

    	boolean result = removeModel(userId, modelId);
    	Logger.info("Deleting model " + modelId + " for user " + userId);
    	return result? ok() : notFound();
    }
    
    private JsonNode templatesJson = null;
    
    private JsonNode getTemplatesJsonNode() throws IOException {
    	if (templatesJson == null) {
	    	try (InputStream in = application.get().resourceAsStream("public/templates.json")) {
	    		templatesJson = Json.parse(in);
	    		templatesJson.forEach(template -> {
	    			if (!template.isObject()) {
	    				throw new RuntimeException("Incorrect templates file");
	    			}
	    			ObjectNode object = (ObjectNode) template;
	    			JsonNode idNode = object.get("modelId");
	    			if (idNode != null) {
	    				object.remove("modelId");
	    				object.set("templateId", idNode);
	    			}
	    		});
	    	}
    	}
    	return templatesJson;
    }
    
    /**
     * Returns the template models, optionally filtered for a specific kind.
     * @param kind
     * @return
     */
    public Result getTemplates(String kind) throws IOException {
		ArrayNode arr = mapper.createArrayNode(); 
		
		getTemplatesJsonNode().forEach(child -> {
			if (child.isObject()) {
				String templateKind = child.path("kind").asText();
				if (kind == null || kind.toLowerCase().equals(templateKind)) {
					
					String id = child.path("templateId").asText();
					String name = child.path("title").asText();
					Template model = new Template(id, name, kind);
					arr.add(createTemplateJson(model));
				}
			}
		});

		return ok(arr);
    }

    private ObjectNode createTemplateJson(Template model) {
		ObjectNode child = mapper.createObjectNode();
		child.put("templateId", model.id);
		child.put("title", model.name);
		child.put("kind", model.kind);
    	return child;
    }

    /**
     * Returns the template for the given id.
     * @param modelId
     * @return
     */
    public Result getTemplate(String modelId) throws IOException {
    	for (JsonNode template: getTemplatesJsonNode()) {
    		String templateId = template.path("templateId").asText();
    		if (modelId.equalsIgnoreCase(templateId)) {
    			return ok(template);
    		}
    	}
    	return notFound("Template with id " + modelId + " doesn't exist.");
    }
    
    
    // facebook access
    
    @SuppressWarnings("unused")
	private String loadFacebookUserId(String accessToken) {
    	User user = loadFacebookUser(accessToken);
    	Logger.info("Access token " + accessToken + " is associate with user " + user.getId() + " (" + user.getName() + ")");
    	return user.getId();
//    	return "<debug-user-id>";
    }
    
    private User loadFacebookUser(String accessToken) {
    	FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
    	User user = fbClient.fetchObject("me", User.class, Parameter.with("fields", "email,first_name,last_name"));
    	return user;
    }
    
    // evolaris platform access
    
    private void validateEvolarisUser(String user, String secret) {
    	try {
	    	
	    	Logger.info("Validating evolaris user " + user);
	    	String url = ENVISION_PLATFORM_URL + "platform/external/checkUserAuth";
	    	String data = String.format("user=%s&secret=%s", user, secret);
	    	WSRequest request = ws.url(url).setContentType("application/x-www-form-urlencoded");
	    	CompletionStage<JsonNode> response = request.post(data).thenApply(WSResponse::asJson);
	    	JsonNode node = response.toCompletableFuture().get();
	    	
			if (node != null) {
				JsonNode responseResult = node.get("result");
				JsonNode responseData = node.get("data");
				
				// JSON must be represented as: {"result": "ok", "data": true}
				if (responseResult == null || !responseResult.isTextual() || !responseResult.textValue().equals("ok") ||
						responseData == null || !responseData.isBoolean() || responseData.booleanValue() != true) {
					Logger.info("Failed to validate");
					throw new UnauthenticatedException(user);
				}
				Logger.info("Validated user " + user);
	    	}
    	}
    	catch (InterruptedException | ExecutionException e) {
    		throw new RuntimeException(e);
    	}
    }
    
    
    // mongo database access
	
  private Map<String, Model> loadModels(String userId, String kind) {
		Map<String, Model> result = new HashMap<>();
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
		FindIterable<Document> it = collection.find(modelsFilder(userId, kind));
		for (Document doc: it) {
			String id = doc.getString("modelId");
			String name = doc.getString("title");
			String date = doc.getString("date");
			String modelKind = doc.getString("kind");
			result.put(id, new Model(id, name, date, modelKind));
		}
		Logger.info("Loaded " + result.size() + " models for user " + userId);
		return result;
	}
	
	/**
	 * Loads the model with the given ID and the given user ID.
	 * @param userId
	 * @param modelId
	 * @return
	 */
	private String loadModel(String userId, String modelId) {
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
		Document document = collection.find(filter(userId, modelId)).first();
		if (document == null) {
			return null;
		}
		document.remove("_id");
		document.remove("userId");
		return document.toJson();
	}
	
	private void saveModel(String model, String userId, String modelId) {
		// 50.000 characters in its serialized form, maximum of 100 models
		// results in maximum of 5.000.000 (5MB max)
		if (model.length() > MAX_MODEL_LENGTH) {
			throw new ModelTooLargeException();
		}
		
		// check how many documents are stored.
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
		long stored = collection.count(userIdFilter(userId));
		if (stored > MAX_STORED_MODELS) {
			throw new TooManyModelsStoredException();
		}
		
		Document doc = Document.parse(model);
		doc.put("userId", userId);
		doc.put("modelId", modelId);
		
		UpdateResult result = collection.replaceOne(filter(userId, modelId), doc);
		if (result.getMatchedCount() != 0) {
			Logger.info("Updated model " + modelId + " for user " + userId + ": " + result);
		}
		else {
			collection.insertOne(doc);
			Logger.info("Inserted new model " + modelId + " for user " + userId);
		}
		Logger.info("There are now " + collection.count() + " documents");
	}
	
	private boolean removeModel(String userId, String modelId) {
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
		DeleteResult result = collection.deleteOne(filter(userId, modelId));
		return result.getDeletedCount() > 0;
	}
	
	private Bson filter(String userId, String modelId) {
		Bson result = and(userIdFilter(userId), eq("modelId", modelId));
		return result;
	}
	
	private Bson modelsFilder(String userId, String kind) {
		return kind != null?
				and(userIdFilter(userId), eq("kind", kind)) :
				userIdFilter(userId);
	}
	
	private Bson userIdFilter(String userId) {
		return eq("userId", userId);
	}
}
