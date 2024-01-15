import "./../styles/style.css";
import DocumentManager from "./document";
import { DivBuilder } from "./builders";
import FeatureManager from "./feature";

class App {
  private readonly doc: Document;
  private readonly docManager: DocumentManager;

  constructor() {
    this.doc = document;
    this.docManager = new DocumentManager(this.doc);
    this.docManager.addElement(new DivBuilder("tj-app", "c-tj-app"), null);
  }

  start(): void {
    this.loadFeatures();
    this.docManager.buildDocument();
  }

  loadFeatures(): void {
    const feature = new FeatureManager(this.docManager);
    feature.load();
  }
}

// --------------------------------------------------
const app = new App();
app.start();
