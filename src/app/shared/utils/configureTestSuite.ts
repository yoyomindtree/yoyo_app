import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { } from 'jasmine';

export const configureTestSuite = (): any => {
  const testBedApi: any = getTestBed();
  const originReset = TestBed.resetTestingModule;

  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = (): any => TestBed;
  });

  afterEach(() => {
      testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => {
        fixture.destroy();
      });
      testBedApi._instantiated = false;
  });

  afterAll(() => {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
  });
};
