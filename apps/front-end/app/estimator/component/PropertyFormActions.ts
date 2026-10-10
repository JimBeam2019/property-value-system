'use server'

import { z } from 'zod'

import { getPropertyEstimate } from '@/libs/estimate'
import { currentYear } from '@/libs/utils'
import { PropertyType } from '@/types/property'

const propertyFormSchema = z
  .object({
    square_footage: z.coerce
      .number()
      .int()
      .positive({ error: 'Square Footage must be a positive number.' }),
    bedrooms: z.coerce
      .number()
      .int()
      .positive({ error: 'Bedrooms musbe be a positive number.' }),
    bathrooms: z.coerce
      .number()
      .positive({ error: 'Bathrooms musbe be a positive number.' })
      .multipleOf(0.5, {
        error: 'Bathrooms must be in increments of 0.5 (e.g. 1, 1.5, 2).',
      }),
    year_built: z.coerce
      .number()
      .int()
      .min(1800, { error: 'Year built must be greater than 1800.' })
      .max(currentYear, {
        error: `Year built cannot be later than ${currentYear}.`,
      }),
    lot_size: z.coerce
      .number()
      .int()
      .positive({ error: 'Lot size must be a positive number.' }),
    distance_to_city_center: z.coerce.number().positive({
      error: 'Distance to City Center must be a positive number.',
    }),
    school_rating: z.coerce
      .number()
      .positive({ error: 'School Rating must be a positive number.' }),
  })
  .refine((data) => data.lot_size >= data.square_footage, {
    error: 'Lot size must be equal to or greater than square footage.',
    path: ['lot_size'],
  })

export type PropertyFormState = {
  property?: PropertyType
  message: string | null
  success: boolean
  errors: {
    square_footage?: string[]
    bedrooms?: string[]
    bathrooms?: string[]
    year_built?: string[]
    lot_size?: string[]
    distance_to_city_center?: string[]
    school_rating?: string[]
  }
}

/**
 * Submit Property Form
 *
 * @export
 * @param {PropertyFormState} prevState
 * @param {FormData} formData
 * @return {*}  {Promise<PropertyFormState>}
 */
export async function submitPropertyForm(
  prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const validatedFields = propertyFormSchema.safeParse({
    square_footage: formData.get('square_footage'),
    bedrooms: formData.get('bedrooms'),
    bathrooms: formData.get('bathrooms'),
    year_built: formData.get('year_built'),
    lot_size: formData.get('lot_size'),
    distance_to_city_center: formData.get('distance_to_city_center'),
    school_rating: formData.get('school_rating'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Form submission failed.',
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  const estimates = await getPropertyEstimate(validatedFields.data)

  return {
    property: {
      ...validatedFields.data,
      timestampe: Date.now(),
      price: estimates.predicted_price,
    },
    message: 'Success',
    success: true,
    errors: {},
  }
}
