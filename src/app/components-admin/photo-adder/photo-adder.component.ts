import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoAdderModalComponent} from '../photo-adder-modal/photo-adder-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { PhotoModalOutput, PhotoUrlWrapper } from 'src/models/photoModalOutput';

@Component({
  selector: 'app-photo-adder',
  templateUrl: './photo-adder.component.html',
  styleUrls: ['./photo-adder.component.scss'],
})
export class PhotoAdderComponent implements OnInit {
  @Input() inputUrls: PhotoUrlWrapper[] = [];
  @Output() onFilesChanged = new EventEmitter<PhotoUrlWrapper[]>();

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
    modal.onDidDismiss().then((detail: OverlayEventDetail<PhotoUrlWrapper>) => {

      if (detail.data) {

        if (isEdit) {
          // Edit
          this.inputUrls[index] = detail.data;
        } else {
          // Add new
          this.inputUrls.push(detail.data);
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
    this.onFilesChanged.next(this.inputUrls);
  }

}
