import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ReviewControl} from '../interfaces/review-control';
import {Pagination} from '../interfaces/pagination';
import {Order} from '../interfaces/order';

const API_REVIEW_CONTROL = environment.apiBaseLink + '/api/review-control/';


@Injectable({
  providedIn: 'root'
})
export class ReviewControlService {

  constructor(
    private httpClient: HttpClient
  ) {
  }
  
  /**
   * Review Control
   */

  addReview(data: ReviewControl) {
    return this.httpClient.post<{ message: string }>(API_REVIEW_CONTROL + 'add-review', data);
  }


  getAllReviews() {
    return this.httpClient.get<{data: ReviewControl[], message?: string}>(API_REVIEW_CONTROL + 'get-all-review');
  }

  getReviewByReviewId(id: string) {
    return this.httpClient.get<{data: ReviewControl, message?: string}>(API_REVIEW_CONTROL + 'get-review-by-review-id/' + id);
  }

  editReview(data: ReviewControl) {
    return this.httpClient.put<{ message: string }>(API_REVIEW_CONTROL + 'edit-review', data);
  }

  deleteReviewByReviewId(id: string) {
    return this.httpClient.delete<{message?: string}>(API_REVIEW_CONTROL + 'delete-review-by-id/' + id);
  }

  getAllReviewsByQuery(pagination?: Pagination, select?: string, query?: any) {
    let params = new HttpParams();

    if (pagination) {
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
      if (select) {
        params = params.append('select', select);
      }
      return this.httpClient.post<{ data: ReviewControl[], count: number, message?: string }>
      (API_REVIEW_CONTROL + 'get-all-review-by-query', {query}, {params});
    } else {
      if (select) {
        params = params.append('select', select);
      }
      return this.httpClient.post<{ data: ReviewControl[], count: number, message?: string }>
      (API_REVIEW_CONTROL + 'get-all-review-by-query', {query}, {params});
    }
  }

}
