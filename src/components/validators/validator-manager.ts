import ValidatorRuleCallable from "./validator-rule-callable";
import { Form } from "../form";

export default class ValidatorManager {
  constructor(private chainRules:Array<{
    selectorField:string,  // seletor testado
    rules:Array<ValidatorRuleCallable>, // array de validators a ser verificado. Cada Posicao do array tem um callable(string)
    messageInvalid:string // mensagem de erro caso isValid falhe
  }>){
  }

  public isValid():boolean{
    for(let ruleSet of this.chainRules){
      
      for(let rule of ruleSet.rules){
        const value = Form.getValueFromField(ruleSet.selectorField);
        const isValid:boolean = rule(value);

        if(!isValid){
          alert(ruleSet.messageInvalid); return false;
        }

      }

    }

    return true;
  }
}