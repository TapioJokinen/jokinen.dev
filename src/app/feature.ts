import type DocumentManager from "./document";
import { DivBuilder, ImageBuilder, LinkBuilder, SpanBuilder } from "./builders";
import GithubIcon from "../assets/icon-github.png";
import LinkedinIcon from "../assets/icon-linkedin.png";
import CV_TAPIO_JOKINEN from "../assets/CV_TAPIO_JOKINEN.pdf";

export default class FeatureManager {
  constructor(public docManager: DocumentManager) {
    this.docManager = docManager;
  }

  createHeader(): void {
    const headerContainer = new DivBuilder(
      "tj-header-container",
      "c-tj-header-container"
    );

    // region Titles
    const titleContainer = new DivBuilder(
      "tj-title-container",
      "c-tj-title-container"
    );
    const title = new SpanBuilder("tj-title", "c-tj-title", "Tapio Jokinen");
    const subtitle = new SpanBuilder(
      "tj-subtitle",
      "c-tj-subtitle",
      "Software Developer"
    );
    // endregion

    // region Links
    const linkContainer = new DivBuilder(
      "tj-link-container",
      "c-tj-link-container"
    );
    const linkedinLink = new LinkBuilder(
      "tj-linkedin-link",
      "c-tj-link",
      "https://www.linkedin.com/in/tapio-jokinen-b48456158/"
    );
    const linkedinIcon = new ImageBuilder(
      "tj-linkedin-icon",
      "c-tj-link-icon",
      LinkedinIcon as string,
      "Link to LinkedIn profile"
    );
    const githubLink = new LinkBuilder(
      "tj-github-link",
      "c-tj-link",
      "https://github.com/TapioJokinen"
    );
    const githubIcon = new ImageBuilder(
      "tj-github-icon",
      "c-tj-link-icon",
      GithubIcon as string,
      "Link to GitHub profile"
    );
    // endregion

    // region Add elements
    this.docManager.addElement(headerContainer, "tj-app");
    this.docManager.addElement(titleContainer, "tj-header-container");
    this.docManager.addElement(title, "tj-title-container");
    this.docManager.addElement(subtitle, "tj-title-container");
    this.docManager.addElement(linkContainer, "tj-header-container");
    this.docManager.addElement(linkedinLink, "tj-link-container");
    this.docManager.addElement(linkedinIcon, "tj-linkedin-link");
    this.docManager.addElement(githubLink, "tj-link-container");
    this.docManager.addElement(githubIcon, "tj-github-link");
    // endregion
  }

  createCV(): void {
    const cvContainer = new DivBuilder("tj-cv-container", "c-tj-cv-container");
    const cvDownload = new LinkBuilder(
      "tj-cv-download",
      "c-tj-cv-download",
      CV_TAPIO_JOKINEN as string,
      "_blank",
      "Download CV (finnish)"
    );
    this.docManager.addElement(cvContainer, "tj-app");
    this.docManager.addElement(cvDownload, "tj-cv-container");

    this.createCVCard(
      "card2_",
      "JAN 2024",
      "PRESENT",
      "Software Developer",
      "MagiCAD Group Oy",
      "https://magicad.com",
      "Working on frontend stuff.",
      ["Javascript"]
    );

    this.createCVCard(
      "card1_",
      "APR 2021",
      "JAN 2024",
      "Software Developer",
      "Teleste Oyj",
      "https://teleste.com",
      "Worked on several projects, most of them from the very beginning. The biggest projects I contributed to were Warehouse Management System (WMS), device testing platform and dispatch area view (displayed on big screen in production area).",
      ["Python", "Django", "React", "..."]
    );
  }

  createCVCard(
    cvCardId: string,
    jobStarted: string,
    jobEnded: string = "PRESENT",
    jobTitle: string,
    company: string,
    companyLink: string,
    jobDescription: string,
    skills: string[]
  ): void {
    const cvCard = new DivBuilder(`${cvCardId}tj-cv-card`, "c-tj-cv-card");

    // region Date
    const dateContainer = new DivBuilder(
      `${cvCardId}tj-cv-date-container`,
      "c-tj-cv-date-container"
    );
    const dateStart = new SpanBuilder(
      `${cvCardId}tj-cv-date-start`,
      "c-tj-cv-date",
      jobStarted
    );
    const dateArrow = new SpanBuilder(
      `${cvCardId}tj-cv-date-arrow`,
      "c-tj-cv-date-arrow",
      "↑"
    );
    const dateEnd = new SpanBuilder(
      `${cvCardId}tj-cv-date-end`,
      "c-tj-cv-date",
      jobEnded
    );
    // endregion

    const cvDivider = new DivBuilder(
      `${cvCardId}tj-cv-divider`,
      "c-tj-cv-divider"
    );

    const cvContentContainer = new DivBuilder(
      `${cvCardId}tj-cv-content-container`,
      "c-tj-cv-content-container"
    );

    // region Title and Company
    const cvTitleContainer = new DivBuilder(
      `${cvCardId}tj-cv-title-container`,
      "c-tj-cv-title-container"
    );
    const cvTitle = new SpanBuilder(
      `${cvCardId}tj-cv-title`,
      "c-tj-cv-title",
      jobTitle
    );
    const cvTitleDivider = new SpanBuilder(
      `${cvCardId}tj-cv-title-divider`,
      "c-tj-cv-title-divider",
      "|"
    );
    const cvCompany = new LinkBuilder(
      `${cvCardId}tj-cv-company`,
      "c-tj-cv-company",
      companyLink,
      "_blank",
      company
    );
    // endregion

    // region Content
    const cvContentWrapper = new DivBuilder(
      `${cvCardId}tj-cv-content-wrapper`,
      "c-tj-cv-content-wrapper"
    );
    const cvContent = new SpanBuilder(
      `${cvCardId}tj-cv-content`,
      "c-tj-cv-content",
      jobDescription
    );
    // endregion

    const skillsContainer = new DivBuilder(
      `${cvCardId}tj-cv-skills-container`,
      "c-tj-cv-skills-container"
    );

    // region Add elements
    this.docManager.addElement(cvCard, "tj-cv-container");
    this.docManager.addElement(dateContainer, `${cvCardId}tj-cv-card`);
    this.docManager.addElement(dateEnd, `${cvCardId}tj-cv-date-container`);
    this.docManager.addElement(dateArrow, `${cvCardId}tj-cv-date-container`);
    this.docManager.addElement(dateStart, `${cvCardId}tj-cv-date-container`);
    this.docManager.addElement(cvDivider, `${cvCardId}tj-cv-card`);
    this.docManager.addElement(cvContentContainer, `${cvCardId}tj-cv-card`);
    this.docManager.addElement(
      cvTitleContainer,
      `${cvCardId}tj-cv-content-container`
    );
    this.docManager.addElement(
      cvContentWrapper,
      `${cvCardId}tj-cv-content-container`
    );
    this.docManager.addElement(cvTitle, `${cvCardId}tj-cv-title-container`);
    this.docManager.addElement(
      cvTitleDivider,
      `${cvCardId}tj-cv-title-container`
    );
    this.docManager.addElement(cvCompany, `${cvCardId}tj-cv-title-container`);
    this.docManager.addElement(cvContent, `${cvCardId}tj-cv-content-wrapper`);
    this.docManager.addElement(
      skillsContainer,
      `${cvCardId}tj-cv-content-container`
    );
    // endregion

    skills.forEach((item) => {
      const skill = new SpanBuilder(
        `${cvCardId}tj-cv-skill`,
        "c-tj-cv-skill",
        item
      );
      this.docManager.addElement(skill, `${cvCardId}tj-cv-skills-container`);
    });
  }

  load(): void {
    this.createHeader();
    this.createCV();
  }
}
