package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.FacebookClient.AccessToken;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

	private static final String APP_ID = "1193159677397239";
	private static final String APP_SECRET = "6a5e79d7cabb0b0198f5ce94469b4e8a";
	
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
//        FacebookClient facebookClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
//        
//        AccessToken token = facebookClient.obtainExtendedAccessToken(APP_ID, APP_SECRET, accessToken);
//        System.out.println("My extended access token: " + token.getAccessToken());
//        
//        FacebookClient fbc = new DefaultFacebookClient(token.getAccessToken(), Version.VERSION_2_7);
//        User user = fbc.fetchObject("me", User.class);
//
    	
    	FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
    	User user = fbClient.fetchObject("me", User.class, Parameter.with("fields", "email,first_name,last_name,gender"));
    	
        System.out.println(user.getFirstName() + " " + user.getLastName() + ", " + user.getEmail() + ", " + user.getId());
        return ok();
    }

}
