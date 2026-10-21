'use client'

import { useActionState } from 'react'

import {
  PropertyWhatIfFormState,
  submitPropertyWhatIfForm,
} from './PropertyWhatIfFormAction'
import {
  bathroomOptions,
  bedroomOptions,
  yearBuiltOptions,
} from '@/app/components/SelectField'
import TextFieldVertical from '@/app/components/TextFieldVertical'
import SelectFieldVertical from '@/app/components/SelectFieldVertical'
import { MarketPropertyType } from '@/types/market'
import { useMarket } from '@/app/market/context/MarketProvider'

/**
 * Property What-If Form
 *
 * @param {{ property: MarketPropertyType }} { property }
 * @return {*}
 */
const PropertyWhatIfForm = ({ property }: { property: MarketPropertyType }) => {
  const initState: PropertyWhatIfFormState = {
    message: null,
    success: false,
    errors: {},
  }

  const { changeNewProperty } = useMarket()

  const [state, formData, isPending] = useActionState(
    async (prev: PropertyWhatIfFormState, formData: FormData) => {
      const result = await submitPropertyWhatIfForm(prev, formData)

      if (result.success && result.property) {
        changeNewProperty({
          id: property.id,
          squareFootage: result.property.property.squareFootage,
          bedrooms: result.property.property.bedrooms,
          bathrooms: result.property.property.bathrooms,
          yearBuilt: result.property.property.yearBuilt,
          lotSize: result.property.property.lotSize,
          schoolRating: result.property.property.schoolRating,
          distanceToCityCenter: result.property.property.distanceToCityCenter,
          price: result.property.predictedPrice,
        })
      }

      return result
    },
    initState
  )

  return (
    <div className="m-6">
      <form key={property.id} action={formData} noValidate>
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          What-If Analysis
        </h2>

        <div className="py-6 space-y-4">
          <TextFieldVertical
            label="Square Footage"
            type="number"
            name="square_footage"
            id="square_footage"
            defaultValue={property.squareFootage}
            min={1}
            step={1}
            error={state.errors?.squareFootage}
          />
          <SelectFieldVertical
            label="Bedrooms"
            name="bedrooms"
            id="bedrooms"
            defaultValue={property.bedrooms}
            options={bedroomOptions}
            error={state.errors?.bedrooms}
          />
          <SelectFieldVertical
            label="Bathrooms"
            name="bathrooms"
            id="bathrooms"
            defaultValue={property.bathrooms}
            options={bathroomOptions}
            error={state.errors?.bathrooms}
          />
          <SelectFieldVertical
            label="Year Built"
            name="year_built"
            id="year_built"
            defaultValue={property.yearBuilt}
            options={yearBuiltOptions}
            error={state.errors?.yearBuilt}
          />
          <TextFieldVertical
            label="Lot Size"
            type="number"
            name="lot_size"
            id="lot_size"
            defaultValue={property.lotSize}
            min={1}
            step={1}
            error={state.errors?.lotSize}
          />
          <TextFieldVertical
            label="Distance to City Center"
            type="number"
            name="distance_to_city_center"
            id="distance_to_city_center"
            defaultValue={property.distanceToCityCenter}
            min={0.1}
            step={0.1}
            error={state.errors?.distanceToCityCenter}
          />
          <TextFieldVertical
            label="School Rating"
            type="number"
            name="school_rating"
            id="school_rating"
            defaultValue={property.schoolRating}
            min={0.1}
            step={0.1}
            error={state.errors?.schoolRating}
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
          {isPending ? 'Submitting' : 'Apply'}
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

export default PropertyWhatIfForm
