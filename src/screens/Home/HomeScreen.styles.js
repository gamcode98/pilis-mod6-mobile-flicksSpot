import { StyleSheet, StatusBar } from 'react-native'
import { configCarousel } from './utils/configCarousel'
import { COLORS } from '../../utils/theme'

const { ITEM_WIDTH, SPACING_SCREEN, ITEM_HEIGHT } = configCarousel

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    shadowColor: COLORS.black,
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
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800'
  },
  resetText: {
    color: COLORS.primary,
    fontWeight: '600'
  },
  hallsContainer: { marginBottom: 16 },
  hallTitle: { fontWeight: '800', marginBottom: 16 },
  hallsBtns: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap'
  },
  hallBtn: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    textAlign: 'center'
  },
  languagesContainer: { marginBottom: 32 },
  languageTitle: { fontWeight: '800', marginBottom: 16 },
  languagesContent: { flexDirection: 'row', gap: 16 },
  languageBtn: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    textAlign: 'center'
  },
  modalBtn: {
    borderRadius: 8,
    paddingVertical: 16,
    textAlign: 'center',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontWeight: '800'
  }
})
