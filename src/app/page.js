import Upload from '../components/Upload';
import Download from '../components/Download';
import './page.css';

export default function Home() {
  return (
    <div>
      <Upload />
      <hr />
      <Download />
    </div>
  )
}