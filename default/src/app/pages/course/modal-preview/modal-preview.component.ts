import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-modal-preview',
  templateUrl: './modal-preview.component.html',
  styleUrls: ['./modal-preview.component.scss']
})
export class ModalPreviewComponent implements OnInit {
  @Input() file;
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  constructor( private router: Router, private route: ActivatedRoute
    , private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl, {class: 'modal-lg'});
 }

}
