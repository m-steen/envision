package models;

/**
 * Represents a model. Contains the name, ID and date when it was saved.
 */
public class Model {

	public String id;
	public String name;
	public String date;
	public String kind;
	
	public Model() {
	}
	
	public Model(String id, String name, String date, String kind) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.kind = kind;
	}
	
}
