--25-05-2021 Anthony Urrego
if Exists(Select * From Information_Schema.Columns Where Table_Name = 'PWEBCaracteristica') And 
	Not Exists(Select * From Information_Schema.Columns Where Table_Name = 'PWEBCaracteristica' And Column_Name = 'ValorIncre')
Begin
	Alter Table PWEBCaracteristica Add ValorIncre Decimal(12,3) NULL
	Print 'Modifica Tabla PWEBCaracteristica, Agregó ValorIncre Decimal(12,3) NULL'
End
Go

--25-05-2021 Anthony Urrego
if Exists(Select * From Information_Schema.Columns Where Table_Name = 'PWEBProductoCampo') And 
	Not Exists(Select * From Information_Schema.Columns Where Table_Name = 'PWEBProductoCampo' And Column_Name = 'ValorIncre')
Begin
	Alter Table PWEBProductoCampo Add ValorIncre Decimal(12,3) NULL
	Print 'Modifica Tabla PWEBProductoCampo, Agregó ValorIncre Decimal(12,3) NULL'
End
Go