import BaseModel from "./BaseModel.js";

export default class Time extends BaseModel {
  constructor(data = {}) {
    super(data._id, "timetracker");
    this.userId = data.userId ?? null;
    this.projectId = data.projectId ?? null;
    this.subproject = data.subproject ?? null;
    this.ts = data.ts || 0;
    this.date = data.date || null;
    this.duration = data.duration ?? 0;
    this.comment = data.comment ?? "";
  }

  changeTime(newData) {
    Object.assign(this, newData);
    this.save(this);
  }

  changeProject(newProjectId) {
    this.projectId = newProjectId;
    this.saveChanges("projectId");
    return this;
  }

  changeSubproject(newSubproject) {
    this.subproject = newSubproject;
    this.saveChanges("subproject");
    return this;
  }

  changeDate(newDate) {
    this.date = newDate;
    this.saveChanges("date");
    return this;
  }

  changeDuration(newDuration) {
    this.duration = newDuration;
    this.saveChanges("duration");
    return this;
  }

  changeComment(newComment) {
    this.comment = newComment;
    this.saveChanges("comment");
    return this;
  }
}
