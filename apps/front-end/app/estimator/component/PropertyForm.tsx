'use client'

import { useActionState } from 'react'
import { PropertyFormState, submitPropertyForm } from './PropertyFormActions'
import {
  PropertyStoreState,
  usePropertyValueStore,
} from '@/store/property-value-store'
import { useEstimate } from '../context/EstimateProvider'
import TextField from '@/app/components/TextField'
import SelectField, {
  bathroomOptions,
  bedroomOptions,
  yearBuiltOptions,
} from '@/app/components/SelectField'

/**
 * Property Form
 *
 * @return {*}
 */
const PropertyForm = () => {
  const initState: PropertyFormState = {
    message: null,
    success: false,
    errors: {},
  }
  const { properties } = usePropertyValueStore() as PropertyStoreState
  const addProperty = usePropertyValueStore((state) => state.addProperty)

  const { setCurPropertyEstimate } = useEstimate()

  const [state, formData, isPending] = useActionState(
    async (prev: PropertyFormState, formData: FormData) => {
      const result = await submitPropertyForm(prev, formData)

      if (
        result.success &&
        result.property &&
        !properties.some(
          ({ timestampe }) => timestampe === result.property?.timestampe
        )
      ) {
        addProperty({ ...result.property, id: properties.length + 1 })
        setCurPropertyEstimate(result.property)
      }

      return result
    },
    initState
  )

  return (
    <div className="m-6">
      <form
        action={formData}
        noValidate
        className="mx-auto w-full max-w-8xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Property Details
        </h2>

        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          <TextField
            label="Square Footage"
            type="number"
            name="square_footage"
            id="square_footage"
            min={1}
            step={1}
            error={state.errors?.square_footage}
          />
          <SelectField
            label="Bedrooms"
            name="bedrooms"
            id="bedrooms"
            options={bedroomOptions}
            error={state.errors?.bedrooms}
          />
          <SelectField
            label="Bathrooms"
            name="bathrooms"
            id="bathrooms"
            options={bathroomOptions}
            error={state.errors?.bathrooms}
          />
          <SelectField
            label="Year Built"
            name="year_built"
            id="year_built"
            options={yearBuiltOptions}
            error={state.errors?.year_built}
          />
          <TextField
            label="Lot Size"
            type="number"
            name="lot_size"
            id="lot_size"
            min={1}
            step={1}
            error={state.errors?.lot_size}
          />
          <TextField
            label="Distance to City Center"
            type="number"
            name="distance_to_city_center"
            id="distance_to_city_center"
            min={0.1}
            step={0.1}
            error={state.errors?.distance_to_city_center}
          />
          <TextField
            label="School Rating"
            type="number"
            name="school_rating"
            id="school_rating"
            min={0.1}
            step={0.1}
            error={state.errors?.school_rating}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium
          text-white shadow-sm transition-colors
          hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-300
          disabled:cursor-not-allowed disabled:bg-blue-300
          sm:w-auto"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>

        {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default PropertyForm
