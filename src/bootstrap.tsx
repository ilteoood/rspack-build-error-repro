import {createRoot} from 'react-dom/client'
import {Navigate, Route, RouterProvider, createHashRouter, createRoutesFromElements} from 'react-router-dom'

import Company from './routes/organizations/organizationId/company/Company'

const organization = {
  organizationName: 'Example name',
  id: '4db47078-48d3-4892-90cd-e2aa6b2b366e',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: {
    id: '7709bf49-8d6e-4262-abc4-b2212a150ae5',
    firstName: 'Matteo Pietro',
    lastName: 'Dazzi'
  },
  companyId: 'b672ff61-f43e-4440-989e-def6eb0bb6d3'
}

const container = document.getElementById('root')
const root = createRoot(container!)

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<Company organization={organization} />} path="/organizations/:organizationId/company/*" />
      <Route element={<Navigate to={`/organizations/${organization.id}/company`} />} path="*" />
    </>
  )
)

root.render(<RouterProvider router={router} />)
