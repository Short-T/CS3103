sqlProcName = 'getPets'

# Run query and get result
try:
	cursor = dbConnection.cursor()
	cursor.callproc(sqlProcName)
	dbConnection.commit()

	# We get all of the results and then iterate through them.
	results = cursor.fetchall()

	# Figure out what to do for images
	for row in results:
		print ("%s, %s" % (row["PetName"], row["PetSpecies"], row["PetBreed"]), row["PetAge"] )

except pymysql.MySQLError as e:
	# failure
	print(e)
finally:
	#close dbConnection
	dbConnection.close()

# End.