package controllers;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;

import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

	private static final String APP_ID = "1193159677397239";
	private static final String APP_SECRET = "6a5e79d7cabb0b0198f5ce94469b4e8a";

    private ObjectMapper mapper = new ObjectMapper();
    
    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        return ok();
    }
    
    public Result demo(String accessToken) {
    	FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
    	User user = fbClient.fetchObject("me", User.class, Parameter.with("fields", "email,first_name,last_name,gender"));
    	
        System.out.println(user.getFirstName() + " " + user.getLastName() + ", " + user.getEmail() + ", " + user.getId());
        return ok();
    }

    public Result getModels(String accessToken) {
    	String userId = loadFacebookUserId(accessToken);
    	Map<String, String> models = loadModels(userId);
    	ArrayNode arr = mapper.createArrayNode();
    	models.forEach((key, value) -> {
    		ObjectNode child = mapper.createObjectNode();
    		child.put("id", key);
    		child.put("uri", "/api/models/" + key + "?accessToken=" + accessToken);
    		child.put("title", value);
    		arr.add(child);
    	});
    	return ok(arr);
    }
    
    public Result getModel(String modelId, String accessToken) {
    	String userId = loadFacebookUserId(accessToken);
    	String json = loadModel(userId, modelId);
    	if (json == null) {
    		Logger.info("Model " + modelId + " for user " + userId + " not found");
    		return notFound("Model " + modelId + " for user " + userId + " not found");
    	}
    	
    	Logger.info("Model " + modelId + " for user " + userId + " found, " + json.length() + " chars");
    	return ok(Json.parse(json));
    }
    
    public Result postModel(String accessToken) {
    	String userId = loadFacebookUserId(accessToken);
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
    
    public Result putModel(String modelId, String accessToken) {
    	String userId = loadFacebookUserId(accessToken);
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
    
    // facebook access
    
    private String loadFacebookUserId(String accessToken) {
    	User user = loadFacebookUser(accessToken);
    	Logger.info("Access token " + accessToken + " is associate with user " + user.getId() + " (" + user.getName() + ")");
    	return user.getId();
    }
    
    private User loadFacebookUser(String accessToken) {
    	FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
    	User user = fbClient.fetchObject("me", User.class, Parameter.with("fields", "email,first_name,last_name"));
    	return user;
    }
    
    // mongo database access
    
	private MongoClient mongoClient = new MongoClient("localhost");

	private Map<String, String> loadModels(String userId) {
		Map<String, String> result = new HashMap<>();
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
		FindIterable<Document> it = collection.find(userIdFilter(userId));
		for (Document doc: it) {
			String id = doc.getString("modelId");
			String name = doc.getString("title");
			result.put(id, name);
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
		Document doc = Document.parse(model);
		doc.put("userId", userId);
		doc.put("modelId", modelId);
		
		MongoDatabase database = mongoClient.getDatabase("envision");
		MongoCollection<Document> collection = database.getCollection("models");
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
	
	private Bson filter(String userId, String modelId) {
		Bson result = and(userIdFilter(userId), eq("modelId", modelId));
		return result;
	}
	
	private Bson userIdFilter(String userId) {
		return eq("userId", userId);
	}
}
