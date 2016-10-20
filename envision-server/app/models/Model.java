package models;

/**
 * Represents a model. Contains the name, ID and date when it was saved.
 */
public class Model {

	public String id;
	public String name;
	public String date;

	public Model() {
	}
	
	public Model(String id, String name, String date) {
		this.id = id;
		this.name = name;
		this.date = date;
	}
	
}
