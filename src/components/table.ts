export abstract class Table {

  constructor(
    private selector: string,
    private columns: Array<string>,
    private _data?: Array<any>
  )
  {
    if(!this.getElement())
      throw "Seletor HTML não encontrado";

    this.createThead();
    this.createRows();
  }

  private getElement()
  {
    return document.querySelector(this.selector);
  }


  /**
   * Estrutura de dados esperada 
   * private data: Array<any> :
   * {
   *  {
   *    id: 1
   *    nome: "Hambúrguer"
   *    preco: 8.5
   *  }
   * }
   */
  private createRows()
  {

    if(this.getElement() && this._data !==undefined){

      /**
       * Para cada jsonObject iterado eu construo uma linha em table
       * Sempre montando de acordo com as colunas passadas
       */
      for(let row of this._data){

        const tr = document.createElement('tr');

        for(let column of this.columns){

          // passo a tr criada e o valor referente a coluna iterada
          const td = this.createColumn(tr,row[column]);
          this.getElement().appendChild(tr)

        }

      }

    }

    

  }

  private createColumn(trRow,columnData:any)
  {
    
    let td = document.createElement('td');
    
    td.innerHTML = columnData;
    trRow.appendChild(td);
  }

  private createThead()
  {
    for(let columnName of this.columns){
      let th = document.createElement('th');
      th.innerHTML = columnName;
      this.getElement().parentElement.querySelector('thead').appendChild(th);
    }

    
  }

  /**
   * get
   * set
   * metodo magico para getter and setter por atribuicao de propriedade;
   * Comporta-se table.name = "valor";
   */
  set data(value)
  {
    this._data = value;
  }
  
  public make()
  {
    this.createRows();
  }

}