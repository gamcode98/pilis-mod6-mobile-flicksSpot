import { Animated, Image, Text, TouchableOpacity, View, Alert, Modal, Pressable, StyleSheet } from 'react-native'
import { useState } from 'react'
import { carouselConfig } from '../utils'
import { formatLongDate, formatTime } from '../../../utils'
import { IconContainer, QrCodeIcon, TicketIcon, DoorIcon, ArrowsRightLeftIcon } from '../../../icons'

export const CardItem = (props) => {
  const { translateY, item } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(item.details[0])
  const { ITEM_SIZE, SPACING } = carouselConfig

  const handleSelectItem = () => {
    setSelectedItem(prevState => {
      const indexFound = item.details.indexOf(prevState)

      if (item.details[indexFound + 1] === undefined) return item.details[0]

      return item.details[indexFound + 1]
    })
  }

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={{
          marginHorizontal: SPACING,
          padding: SPACING * 1,
          alignItems: 'center',
          transform: [{ translateY }],
          backgroundColor: 'white',
          borderRadius: 34
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: '100%',
            height: ITEM_SIZE * 1.2,
            resizeMode: 'cover',
            borderRadius: 24,
            margin: 0
          }}
        />
      </Animated.View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        backgroundColor: 'white',
        paddingTop: 16,
        paddingHorizontal: 8,
        borderRadius: 8
      }}
      >
        <Text style={{
          fontWeight: '800',
          fontSize: 18,
          marginBottom: 8,
          textAlign: 'center'
        }}
        >{item.title}
        </Text>
        <Text style={{
          marginBottom: 8,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          paddingBottom: 8
        }}
        >{formatLongDate(selectedItem.cinemaShow.date)} a las {formatTime(selectedItem.cinemaShow.hour, selectedItem.cinemaShow.minutes)}
        </Text>
        <View style={{
          flexDirection: 'row',
          gap: 16,
          marginBottom: 8
        }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '70%',
            marginBottom: 8
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconContainer color='#000' size={22}>
                <TicketIcon />
              </IconContainer>
              <Text>{selectedItem.quantity}</Text>
            </View>
            <View style={{ height: '100%', width: 1, backgroundColor: '#eee' }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconContainer color='#000' size={22}>
                <DoorIcon />
              </IconContainer>
              <Text>{selectedItem.cinemaShow.room.name}</Text>
            </View>
          </View>
        </View>
        {item.details.length > 1 &&
          <TouchableOpacity
            style={{
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: '#eee',
              marginBottom: 16
            }}
            onPress={handleSelectItem}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconContainer size={24}>
                <ArrowsRightLeftIcon />
              </IconContainer>
              <Text style={{ color: '#000', fontWeight: '800' }}>Cambiar función</Text>
            </View>
          </TouchableOpacity>}
        <TouchableOpacity
          style={{
            backgroundColor: '#f5c518',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 8

          }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <IconContainer>
              <QrCodeIcon />
            </IconContainer>
            <Text style={{ color: '#000', fontWeight: '800' }}>Mostrar código QR</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.')
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={{ uri: selectedItem.qrCode }}
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'cover',
                    borderRadius: 24,
                    margin: 0
                  }}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#F9B208'
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
