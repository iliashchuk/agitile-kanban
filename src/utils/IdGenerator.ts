class IdGenerator {
  prefix = 'REC';

  generate() {
    const currentIdNumber = parseInt(
      localStorage.getItem('currentIdNumber') ?? '1'
    );
    localStorage.setItem('currentIdNumber', (currentIdNumber + 1).toString());
    return `${this.prefix}-${currentIdNumber}`;
  }
}

export default new IdGenerator();
