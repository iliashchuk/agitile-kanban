class IdGenerator {
  prefix = 'REC';

  generate() {
    const currentIdNumber = parseInt(
      localStorage.getItem('currentIdNumber') ?? '1'
    );
    console.log('this kinda generates', currentIdNumber);

    localStorage.setItem('currentIdNumber', (currentIdNumber + 1).toString());
    console.log('was set', (currentIdNumber + 1).toString());
    console.log(currentIdNumber);
    return `${this.prefix}-${currentIdNumber}`;
  }
}

export default new IdGenerator();
