import { StyleSheet, StatusBar } from 'react-native'
import { configCarousel } from './utils/configCarousel'

const { ITEM_WIDTH, SPACING_SCREEN, ITEM_HEIGHT } = configCarousel

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight + 10
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: '90%',
    marginHorizontal: SPACING_SCREEN
  },
  topSection: {
    flexDirection: 'row',
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greetingContainer: {
    flexDirection: 'row'
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  customerName: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 14
  },
  logo: {
    width: 40,
    height: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
    marginTop: 20,
    gap: 8,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexGrow: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10
  },
  // Modal styles
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT / 1.2,
    padding: 16,
    paddingTop: 32
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
