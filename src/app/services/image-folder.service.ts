import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Pagination} from '../interfaces/pagination';
import {ImageFolder} from '../interfaces/image-folder';

const API_IMAGE_FOLDER = environment.apiBaseLink + '/api/admin/image-folder/';

@Injectable({
  providedIn: 'root'
})
export class ImageFolderService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Image Folder
   */

  addNewImageFolderData(data: ImageFolder) {
    return this.http.post<{ message: string }>(API_IMAGE_FOLDER + 'add-new-image-folder', data);
  }

  addNewImageFolderMultiData(data: ImageFolder[]) {
    return this.http.post<{ message: string }>(API_IMAGE_FOLDER + 'add-new-image-folder-multi', {data});
  }

  getAllImageFolderList(pagination?: Pagination) {
    if (pagination) {
      let params = new HttpParams();
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
      return this.http.get<{ data: ImageFolder[], count: number, message?: string }>
      (API_IMAGE_FOLDER + 'get-all-image-folder-list', {params});
    } else {
      return this.http.get<{ data: ImageFolder[], count: number, message?: string }>
      (API_IMAGE_FOLDER + 'get-all-image-folder-list');
    }
  }


  editImageFolderData(data: ImageFolder) {
    return this.http.put<{ message: string }>(API_IMAGE_FOLDER + 'edit-image-folder-by-id', data);
  }

  deleteImageFolderData(id: string) {
    return this.http.delete<{ message: string }>(API_IMAGE_FOLDER + 'delete-image-folder-by-id/' + id);
  }

  getSingleImageFolderById(id: string) {
    return this.http.get<{ data: ImageFolder, message?: string }>(API_IMAGE_FOLDER + 'get-image-folder-details-by-id/' + id);
  }




}
