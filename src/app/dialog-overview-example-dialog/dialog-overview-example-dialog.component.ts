import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Chatbox } from '../chatbox';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialogComponent  {
 // chatResponse: any;
  chatResponse:string;
  TextMsg:FormGroup;
  chatModal=new Chatbox("Say hi");
  sendButton:boolean;
  bottext:string;
  randomStuff:Array<string>=["Hello Nice to here you","Hey Whatsupp","How can I help you","I am your assitant","I am unable to get"];
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) divMsgs: ElementRef;
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) botMsgs: ElementRef;

  constructor(private _NgbActiveModal: NgbActiveModal,private service:ChatService,private renderer:Renderer2,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  get activeModal() {
    return this._NgbActiveModal;
  }
  Empty(){
    if(this.chatModal.inputQuery!=null){
      this.sendButton=true  
    }
    if(this.chatModal.inputQuery==null){
      this.sendButton=false
    }
    console.log("100");
  }
  async GetCategoryById(chat:string):Promise<string>
  {
    var chattest;
     const _this = this;
    
    await  this.service  
    .getChatResponse(chat)
    .toPromise().then((data) => { 
      this.chatResponse = data["chat"];      
    });
    return(this.chatResponse);
  }
  async onSubmit(){
    this.chatResponse = await this.GetCategoryById(this.chatModal.inputQuery);
    this.sendButton=false
    if(this.chatModal.inputQuery==""){
      return false
    }else{
      const divMain= this.renderer.createElement('div');
      const divSub= this.renderer.createElement('div');
      const text=this.renderer.createText(this.chatModal.inputQuery);
      this.renderer.appendChild(divSub,text);
      this.renderer.addClass(divSub,"UserMsg");  
      this.renderer.appendChild(divMain,divSub);
      this.renderer.addClass(divMain,"d-flex");
      this.renderer.addClass(divMain,"flex-row-reverse");
      this.renderer.appendChild(this.divMsgs.nativeElement,divMain);

      //Bot Msgs
      let random=Math.floor(Math.random() * 5) + 0 
      const botMain= this.renderer.createElement('div');
      const botimg= this.renderer.createElement('div');
      this.renderer.addClass(botimg,"botimg"); 
      const botSub= this.renderer.createElement('div');
      //begin
      
      this.bottext=this.renderer.createText(this.chatResponse);
     
        this.renderer.appendChild(botSub,botimg);
        this.renderer.appendChild(botSub,this.bottext);
        this.renderer.addClass(botSub,"botMsg");  
        this.renderer.appendChild(botMain,botSub);
        this.renderer.addClass(botMain,"d-flex");
        this.renderer.appendChild(this.divMsgs.nativeElement,botMain);

      var out = document.getElementById("chatlogs");
      var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
      // console.log('isScrolledToBottom')
      // console.log(isScrolledToBottom)
      // console.log('isScrolledToBottom')
      if(!isScrolledToBottom)
          out.scrollTop = out.scrollHeight - out.clientHeight;
      
      this.chatModal.inputQuery="" //Reseting to empty for next query

    }
  }
}
