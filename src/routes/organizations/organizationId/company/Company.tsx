interface CompanyProps {
  organization: any
}

const Company = ({organization}: CompanyProps) => {
  return <div>{JSON.stringify(organization)}</div>
}

const WrappedCompany = ({organization}: CompanyProps) => <div><Company organization={organization} /></div>

export default WrappedCompany
