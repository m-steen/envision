package controllers;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;

import play.Configuration;
import play.Environment;
import play.Logger;
import play.api.OptionalSourceMapper;
import play.api.routing.Router;
import play.http.DefaultHttpErrorHandler;
import play.mvc.Http.RequestHeader;
import play.mvc.Result;
import play.mvc.Results;

@Singleton
public class ErrorHandler extends DefaultHttpErrorHandler {

    @Inject
    public ErrorHandler(Configuration configuration, Environment environment,
                        OptionalSourceMapper sourceMapper, Provider<Router> routes) {
        super(configuration, environment, sourceMapper, routes);
    }
    
    @Override
    public CompletionStage<Result> onServerError(RequestHeader request, Throwable exception) {
    	if (exception instanceof UnauthenticatedException) {
    		UnauthenticatedException ue = (UnauthenticatedException) exception;
    		Logger.info("Unauthorized access for user " + ue.getUserId() + ".");
    		return CompletableFuture.completedFuture(
    				Results.unauthorized("Unable to authenticate for user " + ue.getUserId())
    		);
    	}
    	if (exception instanceof ModelTooLargeException) {
    		Logger.info("Uploaded a model that is too large");
    		return CompletableFuture.completedFuture(
    				Results.badRequest("The uploaded model is too large.")
    		);
    	}
    	if (exception instanceof TooManyModelsStoredException) {
    		Logger.info("Uploaded a model that is too large");
    		return CompletableFuture.completedFuture(
    				Results.badRequest("You have exceeded the number of models you can store.")
    		);
    	}
    	return super.onServerError(request, exception);
    }

//    protected CompletionStage<Result> onProdServerError(RequestHeader request, UsefulException exception) {
//        return CompletableFuture.completedFuture(
//                Results.internalServerError("A server error occurred: " + exception.getMessage())
//        );
//    }
//
//    protected CompletionStage<Result> onForbidden(RequestHeader request, String message) {
//        return CompletableFuture.completedFuture(
//                Results.forbidden("You're not allowed to access this resource.")
//        );
//    }
}