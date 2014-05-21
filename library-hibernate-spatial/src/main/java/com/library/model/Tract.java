package com.library.model;

public class Tract {
	private long id;
    private long population;
    private long housing;
    private double latitude;
    private double longitude;
    private long landarea;
    private long waterarea;   

    public Tract() {
    }


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public long getPopulation() {
		return population;
	}


	public void setPopulation(long population) {
		this.population = population;
	}


	public long getHousing() {
		return housing;
	}


	public void setHousing(long housing) {
		this.housing = housing;
	}


	public double getLatitude() {
		return latitude;
	}


	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}


	public double getLongitude() {
		return longitude;
	}


	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}


	public long getLandarea() {
		return landarea;
	}


	public void setLandarea(long landarea) {
		this.landarea = landarea;
	}


	public long getWaterarea() {
		return waterarea;
	}


	public void setWaterarea(long waterarea) {
		this.waterarea = waterarea;
	}

   
}