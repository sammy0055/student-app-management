const write = (schemaModule, data) => {
  const p = new Promise((resovle, reject) => {
    const result = new schemaModule(data);
    resovle(result.save());
    reject(new Error("message"));
  });
  return p;
};

const read = (schemaModule, data) => {
  return schemaModule.find(data);
};

const updateOne = (schemaModule, data, id) => {
  const p = new Promise((resovle, reject) => {
    const update = schemaModule.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    resovle(update);
    reject(new Error("message"));
  });
  return p;
};

const updatMany = (schemaModule, data, id) => {
  const p = new Promise((resovle, reject) => {
    const update = schemaModule.updateMany(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    resovle(update);
    reject(new Error("message"));
  });
  return p;
};

module.exports = { write, read, updateOne, updatMany };
