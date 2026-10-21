'use server'

import { z } from 'zod'

import { postMarketWhatIf } from '@/libs/marketWhatIf'
import { currentYear } from '@/libs/utils'
import { MarketPropertyResponse } from '@/types/market'

const propertyFormSchema = z
  .object({
    squareFootage: z.coerce
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
    yearBuilt: z.coerce
      .number()
      .int()
      .min(1800, { error: 'Year built must be greater than 1800.' })
      .max(currentYear, {
        error: `Year built cannot be later than ${currentYear}.`,
      }),
    lotSize: z.coerce
      .number()
      .int()
      .positive({ error: 'Lot size must be a positive number.' }),
    distanceToCityCenter: z.coerce.number().positive({
      error: 'Distance to City Center must be a positive number.',
    }),
    schoolRating: z.coerce
      .number()
      .positive({ error: 'School Rating must be a positive number.' }),
  })
  .refine((data) => data.lotSize >= data.squareFootage, {
    error: 'Lot size must be equal to or greater than square footage.',
    path: ['lotSize'],
  })

export type PropertyWhatIfFormState = {
  property?: MarketPropertyResponse
  message: string | null
  success: boolean
  errors: {
    squareFootage?: string[]
    bedrooms?: string[]
    bathrooms?: string[]
    yearBuilt?: string[]
    lotSize?: string[]
    distanceToCityCenter?: string[]
    schoolRating?: string[]
  }
}

/**
 * Submit Property What-If Form
 *
 * @export
 * @param {PropertyWhatIfFormState} prevState
 * @param {FormData} formData
 * @return {*}  {Promise<PropertyWhatIfFormState>}
 */
export async function submitPropertyWhatIfForm(
  prevState: PropertyWhatIfFormState,
  formData: FormData
): Promise<PropertyWhatIfFormState> {
  const validatedFields = propertyFormSchema.safeParse({
    squareFootage: formData.get('square_footage'),
    bedrooms: formData.get('bedrooms'),
    bathrooms: formData.get('bathrooms'),
    yearBuilt: formData.get('year_built'),
    lotSize: formData.get('lot_size'),
    distanceToCityCenter: formData.get('distance_to_city_center'),
    schoolRating: formData.get('school_rating'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Form submission failed.',
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  const estimates = await postMarketWhatIf(validatedFields.data)

  return {
    property: estimates,
    message: 'Success',
    success: true,
    errors: {},
  }
}
