import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, WinnerYearsResponse, StudioWinnerResponse, MinMaxIntervalsResponse } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch winner years', () => {
    const mockResponse: WinnerYearsResponse = { years: [{ year: 2020, winnerCount: 2 }] };

    service.getData_Winners_Years().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.apiUrl_winner_years);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  

  it('should fetch top studios', () => {
    const mockResponse: StudioWinnerResponse = { studios: [{ name: 'Studio A', winCount: 5 }] };

    service.getData_top3_studios().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.apiUrl_top_distributors);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


  it('should fetch min-max intervals', () => {
    const mockResponse: MinMaxIntervalsResponse = {
      max: [{ producer: 'Producer A', interval: 5, previousWin: 2015, followingWin: 2020 }],
      min: [{ producer: 'Producer B', interval: 1, previousWin: 2019, followingWin: 2020 }]
    };

    service.getMinMaxIntervals().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.apiUrlMinMaxIntervals);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  

  it('should handle empty response for winner years', () => {
    const mockResponse: WinnerYearsResponse = { years: [] };

    service.getData_Winners_Years().subscribe(data => {
      expect(data).toEqual(mockResponse);
      expect(data.years.length).toBe(0);
    });

    const req = httpMock.expectOne(service.apiUrl_winner_years);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle empty response for top studios', () => {
    const mockResponse: StudioWinnerResponse = { studios: [] };

    service.getData_top3_studios().subscribe(data => {
      expect(data).toEqual(mockResponse);
      expect(data.studios.length).toBe(0);
    });

    const req = httpMock.expectOne(service.apiUrl_top_distributors);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle empty response for min-max intervals', () => {
    const mockResponse: MinMaxIntervalsResponse = {
      max: [],
      min: []
    };

    service.getMinMaxIntervals().subscribe(data => {
      expect(data).toEqual(mockResponse);
      expect(data.max.length).toBe(0);
      expect(data.min.length).toBe(0);
    });

    const req = httpMock.expectOne(service.apiUrlMinMaxIntervals);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});