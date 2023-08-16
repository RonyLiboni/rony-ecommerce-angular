import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/domain/services/product/product.service';

interface ProductImageFormProperties{
  productId: number;
  imageKey?: string;
  imageOrder?: number;
}

@Component({
  selector: 'app-product-image-form',
  templateUrl: './product-image-form.component.html',
  styleUrls: ['./product-image-form.component.css']
})
export class ProductImageFormComponent {
  dialogRef: MatDialogRef<ProductImageFormComponent>;
  errorMessage: string = '';
  productId!: number;
  imageKey!: string;
  image?: File;
  newImageOrder!: number;
  isLoadingResult: boolean = false;

  constructor(private readonly _productService: ProductService,
              dialogRef: MatDialogRef<ProductImageFormComponent>,
              @Inject(MAT_DIALOG_DATA) formProperties: ProductImageFormProperties) {
    this.setInitialProperties(formProperties);
    this.dialogRef = dialogRef;
  }

  public setInitialProperties(formProperties: ProductImageFormProperties):void{
    this.productId = formProperties.productId;
    this.newImageOrder = formProperties.imageOrder!;
    if(formProperties.imageKey){
      this.imageKey = formProperties.imageKey;
      this.newImageOrder = formProperties.imageOrder ?? 2;
    }
  }

  public setImage(event: any): void{
    this.resetForm();
    let file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(!allowedTypes.some(type => type === file.type)){
      this.errorMessage = "It is only allowed images of type .jpg and .png";
      return;
    }
    const sizeInMB = 3;
    const MAX_IMAGE_SIZE_IN_BYTES = sizeInMB * 1024 * 1024;
    if(file.size > MAX_IMAGE_SIZE_IN_BYTES){
      this.errorMessage = `The size of the file can't be bigger than ${sizeInMB} MB`;
      return;
    }
    this.image = file;
  }

  private resetForm():void{
    this.image = undefined;
    this.errorMessage = '';
  }

  public addProductImage(): void{
    this.isLoadingResult = true;
    this.errorMessage = '';
    this._productService.addImage(this.productId, this.newImageOrder, this.image!)
                        .subscribe({
                          next: (productImage) => {
                            this.isLoadingResult = false;
                            this.dialogRef.close(productImage);
                          },
                          error: (error) => {
                            this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
                            this.isLoadingResult = false;
                          },
                        });
  }

  public editImageOrder(): void{
    this.isLoadingResult = true;
    this._productService.editImage(this.productId, this.imageKey, this.newImageOrder)
                        .subscribe({
                          next: (empty) => {
                            this.dialogRef.close(this.newImageOrder);
                            this.isLoadingResult = false;
                          },
                          error: (error) => {
                            this.errorMessage = error.error.validationErrors[0].userMessage ?? error.error.detail;
                            this.isLoadingResult = false;
                          },
                        });
  }

  public closeModalForm(): void{
    this.dialogRef.close();
  }

}
