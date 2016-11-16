package controllers;

/**
 * Thrown when authentication has failed.
 */
public class UnauthenticatedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String userId;
	
	public UnauthenticatedException(String userId) {
		this.userId = userId;
	}
	
	public String getUserId() {
		return userId;
	}
}
