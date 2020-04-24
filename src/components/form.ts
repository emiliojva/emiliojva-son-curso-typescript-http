export class Form {
  
  /**
   * 
   * @param selectorName nome do seletor para localizar input dentro do form por (id,name,class,data-?)
   * @param formId 
   * HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement
   */
  static getValueFromField(selectorName:string, formId?:string): string {
    /**
     * Forma possiveis de um FormElement se encontrado
     */
    let querys = [
      `[name=${selectorName}]`,
      `#${selectorName}`,
      `.${selectorName}`,
      `[data-${selectorName}]`,
    ];

    for(let q of querys){

      let domFormElement:HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement = document.querySelector('form > '+q);
      
      let interfacesInputAccepts = (domFormElement instanceof HTMLInputElement || domFormElement instanceof HTMLTextAreaElement || domFormElement instanceof HTMLSelectElement);

      if( interfacesInputAccepts && domFormElement !== null){
        return domFormElement.value;    
      }
      
    }
    return null;
  }

}