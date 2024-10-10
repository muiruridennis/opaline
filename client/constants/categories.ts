interface CategoryService {
    label: string,
    value: string,
    disabled?: boolean
}
export const serviceCategories: CategoryService[] = [
    { label: 'Choose service Category', value: '', disabled: true  },
    { label: 'Health & Wellness', value: 'HealthWellness' },
    { label: 'Beauty & Personal Care', value: 'BeautyPersonalCare' },
    { label: 'Fitness & Exercise', value: 'FitnessExercise' },
    { label: 'Spa Services', value: 'SpaServices' },
    { label: 'Wellness Coaching', value: 'WellnessCoaching' },
    { label: 'Education & Learning', value: 'EducationLearning' },
    { label: 'Events & Entertainment', value: 'EventsEntertainment' },
    { label: 'Household Services', value: 'HouseholdServices' },
    { label: 'Travel & Leisure', value: 'TravelLeisure' },
    { label: 'Pet Services', value: 'PetServices' },
    { label: 'Professional Services', value: 'ProfessionalServices' },
    { label: 'Specialized Services', value: 'SpecializedServices' }
];
