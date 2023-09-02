import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IconContainer, MinusIcon, PlusIcon, TrashIcon } from '../../../../icons'
import { formatLongDate, formatTime } from '../../../../utils'
import { styles } from './CartItem.styles'

export const CartItem = (props) => {
  const { item, handleRemoveItem, handleTicketsInCart } = props

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.longDate}>{formatLongDate(item.date)} a las {formatTime(item.hour, item.minutes)} - {item.hall}
        </Text>
        <Text style={styles.subtotal}>Subtotal: ${item.unitPrice * item.quantity}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => await handleTicketsInCart(item.cinemaShowId, 'decrement')}
          >
            <IconContainer size={20}>
              <MinusIcon />
            </IconContainer>
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => await handleTicketsInCart(item.cinemaShowId, 'increment')}
          >
            <IconContainer size={20}>
              <PlusIcon />
            </IconContainer>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={async () => await handleRemoveItem(item.cinemaShowId)}
      >
        <IconContainer size={20}>
          <TrashIcon />
        </IconContainer>
      </TouchableOpacity>
    </View>
  )
}
