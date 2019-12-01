import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoAdderModalComponent, PhotoModalOutput } from '../photo-adder-modal/photo-adder-modal.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-photo-adder',
  templateUrl: './photo-adder.component.html',
  styleUrls: ['./photo-adder.component.scss'],
})
export class PhotoAdderComponent implements OnInit {
  @Input() inputUrls: string[] = [];
  @Output() onUrlsChange = new EventEmitter<string[]>();

  constructor(
    protected modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  async onAddPhotoButton() {
    this.openPhotoModal();
  }

  async onEditPhotoButton(index: number) {
    this.openPhotoModal(true, index);
  }

  async openPhotoModal(isEdit: boolean = false, index: number = null) {
    const modal = await this.modalCtrl.create({
      component: PhotoAdderModalComponent,
      componentProps: {
        url: this.inputUrls[index]
      }
    });
    modal.present();
    modal.onDidDismiss().then((detail: OverlayEventDetail<PhotoModalOutput>) => {

      if (detail.data.url) {

        if (isEdit) {
          // Edit
          this.inputUrls[index] = detail.data.url;
        } else {
          // Add new
          this.inputUrls.push(detail.data.url);
        }

        console.log(this.inputUrls);
      }
    })
    this.updateOutput();
  }

  onRemovePhotoButton(i: number) {
    this.inputUrls.splice(i, 1);
    this.updateOutput();
  }

  updateOutput() {
    this.onUrlsChange.next(this.inputUrls);
  }

}
