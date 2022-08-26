import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ImageGallery} from '../interfaces/image-gallery';
import {Pagination} from '../interfaces/pagination';

const API_GALLERY = environment.apiBaseLink + '/api/admin/gallery/';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * IMAGE GALLEY
   */

  addNewGalleryData(data: ImageGallery) {
    return this.http.post<{ message: string }>(API_GALLERY + 'add-new-gallery', data);
  }

  addNewGalleryMultiData(data: ImageGallery[]) {
    return this.http.post<{ message: string }>(API_GALLERY + 'add-new-gallery-multi', {data});
  }

  getAllGalleryList(pagination?: Pagination, queryFolderId?: string) {
    if (pagination) {
      let params = new HttpParams();
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
      if (queryFolderId) {
        params = params.append('folder', queryFolderId);
      }
      return this.http.get<{ data: ImageGallery[], count: number, message?: string }>(API_GALLERY + 'get-all-gallery-list', {params});
    } else {
      return this.http.get<{ data: ImageGallery[], count: number, message?: string }>(API_GALLERY + 'get-all-gallery-list');
    }
  }

  getSearchImages(query: string, pagination?: Pagination) {
    let params = new HttpParams();
    params = params.append('q', query);

    if (pagination) {
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
    }
    return this.http.get<{ data: ImageGallery[], count: number, message?: string }>(API_GALLERY + 'search-image-by-regex', {params});

  }

  editGalleryData(data: ImageGallery) {
    return this.http.put<{ message: string }>(API_GALLERY + 'edit-gallery-by-id', data);
  }

  deleteGalleryData(id: string) {
    return this.http.delete<{ message: string }>(API_GALLERY + 'delete-gallery-by-id/' + id);
  }

  deleteGalleryDataMulti(ids: string[]) {
    return this.http.post<{ message: string }>(API_GALLERY + 'delete-gallery-images-multi', {data: ids});
  }




}
