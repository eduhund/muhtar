export class BaseModel {
  constructor(repository, _id) {
    this.repository = repository;
    this.id = _id;
  }

  async save() {
    const data = { ...this, _id: this.id };
    delete data.id;

    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
  }

  async delete() {
    const collection = this.constructor.getCollection();
    await collection.deleteOne({ _id: this.id });
  }
}

export class BaseFactory {
  constructor(repository) {
    this.repository = repository;
  }
}
