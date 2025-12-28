import Button from '../ui/Button'
import TextType from '../ui/TextType'
import Card from '../ui/Card'

function ReturnVideo() {
  return (
      <Card>
      <div className="flex justify-between items-center">
        <TextType variant="h2">Resultat</TextType>
        <Button>New generation</Button>
      </div>
      <div>
        <TextType>VIDEO</TextType>
      </div>
      <div>
        <TextType>Others videos generated</TextType>
      </div>
      </Card>
  )
}

export default ReturnVideo