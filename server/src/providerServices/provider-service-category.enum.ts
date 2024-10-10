import { registerEnumType } from '@nestjs/graphql';

export enum ServiceCategoryEnum {
    HealthWellness = 'health-wellness',
    BeautyPersonalCare = 'beauty-personal-care',
    FitnessExercise = 'fitness-exercise',
    SpaServices = 'spa-services',
    WellnessCoaching = 'wellness-coaching',
    EducationLearning = 'education-learning',
    EventsEntertainment = 'events-entertainment',
    HouseholdServices = 'household-services',
    TravelLeisure = 'travel-leisure',
    PetServices = 'pet-services',
    ProfessionalServices = 'professional-services',
    SpecializedServices = 'specialized-services'
  }
  
  registerEnumType(ServiceCategoryEnum, {
    name: 'ServiceCategoryEnum', 
    description: 'The different categories a service can lie in',
  });