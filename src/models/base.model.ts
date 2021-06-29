export default class BaseModel<T> {
  assimilate?(model: Omit<T, 'assimilate'>): void {
    for (const key in model) {
      this[key] = model[key];
    }
  }
}
