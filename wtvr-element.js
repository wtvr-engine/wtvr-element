export default class WTVRElement extends HTMLElement {

    constructor(){
        super();
        this.lastTick = null;
        this.enabled = true;
    }

    connectedCallback(){
        if(this.hasAttribute("auto") && this.getAttribute("auto") != "false"){
            this.start();
        }
    }

    start(){
        if((this.hasAttribute("auto") && this.getAttribute("auto") != "false")
            || (this.hasAttribute("self-update") && this.getAttribute("self-update") != "false")){
            requestAnimationFrame(this.selfUpdate.bind(this));
        }
    }

    disable(){
        this.enabled = false;
    }

    update(deltaTime){

    }

    selfUpdate(timeStamp){
        let delta = 0;
        if (this.lastTick !== null) {
            delta = timeStamp - this.lastTick;
        }
        this.lastTick = timeStamp;
        if(this.enabled){
            this.update(delta);
        }
        requestAnimationFrame(this.selfUpdate.bind(this));
    }

    getNumberAttribute(name,def){
      this[name] = def;
      if(this.hasAttribute(name)){
          this[name]= Number(this.getAttribute(name));
      }
    }

    getStringAttribute(name,def){
      this[name] = def;
      if(this.hasAttribute(name)){
          this[name]= this.getAttribute(name);
      }
    }

    static createElement(templateString){
      let template = document.createElement('template');
      template.innerHTML = templateString;
      return document.importNode(template.content,true);
    }

}
