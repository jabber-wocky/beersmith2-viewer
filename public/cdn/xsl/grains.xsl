<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <h2>Grain</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Origin</th>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Inventory</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//Grain[boolean(./F_G_NAME) and ./F_G_INVENTORY != 0.0000000]">
                    <xsl:sort select="./F_G_NAME" />

                    <tr>
                        <td><xsl:value-of select="F_G_NAME" /></td>
                        <td><xsl:value-of select="F_G_ORIGIN" /></td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="F_G_TYPE = 0">Grain</xsl:when>
                                <xsl:when test="F_G_TYPE = 1">Extract</xsl:when>
                                <xsl:when test="F_G_TYPE = 2">Sugar</xsl:when>
                                <xsl:when test="F_G_TYPE = 3">Adjunct</xsl:when>
                                <xsl:when test="F_G_TYPE = 4">Dry Extract</xsl:when>
                                <xsl:otherwise></xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td><xsl:value-of select="format-number(round(F_G_COLOR*10) div 10, '##0.0')" /> SRM</td>
                        <td>
							<span data-unit="imperial"><xsl:value-of select="format-number(round(F_G_INVENTORY*0.0625*100) div 100, '##0.00')" /> lb</span>
							<span data-unit="metric"><xsl:value-of select="format-number(round(F_G_INVENTORY*0.0283495*100) div 100, '##0.00')" /> kg</span>
						</td>
                        <td>
							
							<span data-unit="imperial"><xsl:value-of select="format-number(round(F_G_PRICE*16*100) div 100, '##0.00')" /> $/lb</span>
							<span data-unit="metric"><xsl:value-of select="format-number(round(F_G_PRICE*35.274*100) div 100, '##0.00')" /> $/kg</span>
						</td>
                        
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>