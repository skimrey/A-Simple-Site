import DataTable from '../components/DataTable'
import MyComponent from '../components/MyComponent'

function Dashboard() {
  return (
    <div className='form'>
      <DataTable />
      <div className='ml-10 mr-10'>
      <MyComponent />
      </div>
    </div>
  )
}

export default Dashboard