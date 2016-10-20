<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <h2>Hops</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Alpha</th>
                    <th>Type</th>
                    <th>Form</th>
                    <th>Inventory</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="//Hops[boolean(./F_H_NAME) and ./F_H_INVENTORY != 0.0000000]">
                    <xsl:sort select="./F_H_NAME" />

                    <tr>
                        <td><xsl:value-of select="F_H_NAME" /></td>
                        <td><xsl:value-of select="format-number(round(F_H_ALPHA*100) div 100, '##0.00')" />%</td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="F_H_TYPE = 0">Bittering</xsl:when>
                                <xsl:when test="F_H_TYPE = 1">Aroma</xsl:when>
                                <xsl:when test="F_H_TYPE = 2">Both</xsl:when>
                                <xsl:otherwise></xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="F_H_FORM = 0">Pellet</xsl:when>
                                <xsl:when test="F_H_FORM = 1">Plug</xsl:when>
                                <xsl:when test="F_H_FORM = 2">Leaf</xsl:when>
                                <xsl:otherwise></xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td>
							<span data-unit="imperial"><xsl:value-of select="format-number(round(F_H_INVENTORY*10) div 10, '##0.0')" /> oz</span>
							<span data-unit="metric"><xsl:value-of select="format-number(round(F_H_INVENTORY*28.3495*10) div 10, '##0.0')" /> g</span>
						</td>
                        <td>
							<span data-unit="imperial"><xsl:value-of select="format-number(round(F_H_PRICE*100) div 100, '##0.00')" /> $/oz</span>
							<span data-unit="metric"><xsl:value-of select="format-number(round(F_H_PRICE div 2.83495 * 100) div 100, '##0.00')" /> $/10g</span>
						</td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>