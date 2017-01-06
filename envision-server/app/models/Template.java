package models;

/**
 * Represents a model. Contains the name, ID and date when it was saved.
 */
public class Template {

	public String id;
	public String name;
	public String kind;
	
	public Template(String id, String name, String kind) {
		this.id = id;
		this.name = name;
		this.kind = kind;
	}
	
}
