import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 5,
    padding: 8
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 5,
    padding: 8
  },
  errorText: {
    color: 'red',
    fontSize: 12
  },
  errorContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  }
})
