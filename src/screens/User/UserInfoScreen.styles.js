import { StatusBar, StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../utils/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: StatusBar.currentHeight
  },
  header: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    width: 90,
    height: 90,
    backgroundColor: '#f2f2f2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    overflow: 'hidden'
  },
  profileImage: {
    width: 80,
    height: 80
  },
  profileInfo: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: SPACING.lg
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    padding: 20
  },
  profileActions: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  itemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  logout: {
    borderBottomWidth: 0
  }
})
