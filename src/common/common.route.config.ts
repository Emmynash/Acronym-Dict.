import express from "express";

export abstract class CommonRouteConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app,
    this.name = name,
    this.configureRoute();
  }

  getName() {
    return this.name;
  }
  abstract configureRoute(): express.Application;
}
