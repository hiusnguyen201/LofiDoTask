export function isExist(field, value, model) {
  const result = model
    .findOne({
      [field]: value,
    })
    .exec();

  return result;
}
